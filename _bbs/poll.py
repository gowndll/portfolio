from fastapi import APIRouter, Depends, Form, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from common import *
from database import get_db
from models import Poll, PollEtc

router = APIRouter()
templates = MyTemplates(directory=TEMPLATES_DIR)
templates.env.globals["now"] = now
templates.env.globals["generate_token"] = generate_token
templates.env.globals["generate_query_string"] = generate_query_string
templates.env.globals["get_member_level"] = get_member_level

# jinja2 에서 continue 문 사용하기 위한 확장 등록
templates.env.add_extension('jinja2.ext.loopcontrols')


@router.post("/poll_update/{po_id}")
def poll_update(request: Request, po_id: int, token: str = Form(...), gb_poll: int = Form(...), db: Session = Depends(get_db)):
    """
    투표하기
    """
    if not check_token(request, token):
        raise AlertException("토큰이 유효하지 않습니다.", 403)

    poll = db.query(Poll).get(po_id)
    member = request.state.login_member
    member_level = get_member_level(request)

    if not poll:
        raise AlertCloseException(status_code=404, detail="존재하지 않는 투표입니다.")

    if poll.po_level > 1 and member_level < poll.po_level:
        raise AlertCloseException(status_code=403, detail=f"권한 {poll.po_level} 이상의 회원만 투표하실 수 있습니다.")
    
    if request.client.host in poll.po_ips or (member and member.mb_id in poll.mb_ids):
        raise AlertException(status_code=403, detail=f"{poll.po_subject} 투표에 이미 참여하셨습니다.", url=f"/bbs/poll_result/{po_id}")

    if member:
        poll.mb_ids = ",".join([poll.mb_ids, member.mb_id]) if poll.mb_ids else member.mb_id
    else:
        poll.po_ips = ",".join([poll.po_ips, request.client.host]) if poll.po_ips else request.client.host
    
    # gb_poll로 전달받은 컬럼번호에 1 증가시킨다.
    poll.__setattr__(f"po_cnt{gb_poll}", poll.__getattribute__(f"po_cnt{gb_poll}") + 1)
    db.commit()

    # 포인트 지급
    insert_point(request, member.mb_id, poll.po_point,  f'{poll.po_id}. {poll.po_subject[:20]} 투표 참여 ', '@poll', poll.po_id, '투표');

    return RedirectResponse(url=f"/bbs/poll_result/{po_id}", status_code=302)
      

@router.get("/poll_result/{po_id}")
def poll_result(request: Request, po_id: int, db: Session = Depends(get_db)):
    """
    투표 결과
    """
    poll = db.query(Poll).get(po_id)
    member_level = get_member_level(request)

    if not poll:
        raise AlertCloseException(status_code=404, detail="존재하지 않는 투표입니다.")

    if poll.po_level > 1 and member_level < poll.po_level:
        raise AlertCloseException(status_code=403, detail=f"권한 {poll.po_level} 이상의 회원만 결과를 보실 수 있습니다.")

    total_count = 0
    max_count = 0
    items = []
    for i in range(1, 10):
        if poll.__getattribute__(f"po_poll{i}"):
            po_cnt = poll.__getattribute__(f"po_cnt{i}")
            # 각 항목 제목/투표 수
            items.append({
                "subject": poll.__getattribute__(f"po_poll{i}"),
                "count": po_cnt
            })
            # 총 투표 수
            total_count += po_cnt
            # 최고 투표 수
            if max_count < po_cnt:
                max_count = po_cnt
    # 기타의견 목록
    etcs = db.query(PollEtc).filter(PollEtc.po_id == po_id).all()
    # 다른 투표결과 목록
    other_list = db.query(Poll).order_by(Poll.po_id.desc()).all()

    return templates.TemplateResponse(
        "bbs/poll_result.html", {
            "request": request, 
            "poll": poll, "items": items, "total_count": total_count, "max_count": max_count, 
            "etcs": etcs, "other_list": other_list
        }
    )


@router.post("/poll_etc_update/{po_id}")
def poll_etc_update(request: Request,
                    po_id: int, 
                    token: str = Form(...),
                    pc_name: str = Form(...),
                    pc_idea: str = Form(...),
                    db: Session = Depends(get_db)):
    """
    기타의견 등록
    """
    if not check_token(request, token):
        raise AlertException(f"{token} : 토큰이 유효하지 않습니다. 새로고침후 다시 시도해 주세요.", 403)

    poll = db.query(Poll).get(po_id)
    config = request.state.config
    member = request.state.login_member
    member_level = get_member_level(request)

    if poll.po_level > member_level:
        raise AlertCloseException(f"권한 {poll.po_level} 이상의 회원만 기타의견을 등록할 수 있습니다.", 403)

    po_etc = PollEtc(po_id=po_id, pc_name=pc_name, pc_idea=pc_idea, mb_id=(member.mb_id if member else ''))
    db.add(po_etc)
    db.commit()

    # 최고관리자 메일 발송 설정이 되어있으면 메일 발송
    if config.cf_email_po_super_admin:
        if config.cf_admin_email:
            email = config.cf_admin_email
            subject = f"[{config.cf_title}] 설문조사 - ({poll.po_subject}) 기타의견 메일"
            body = templates.TemplateResponse(
                "bbs/mail_form/poll_etc_update_mail.html", {
                    "request": request,
                    "subject": subject,
                    "mb_name": pc_name,
                    "mb_id": member.mb_id if member else '비회원',
                    "content": pc_idea
                }
            ).body.decode("utf-8")
            mailer(email, subject, body)

    return RedirectResponse(url=f"/bbs/poll_result/{po_id}", status_code=302)


@router.get("/poll_etc_delete/{pc_id}")
def poll_etc_delete(request: Request, pc_id: int, token: str, db: Session = Depends(get_db)):
    """
    기타의견 삭제
    """
    if compare_token(request, token, "poll_etc_delete"):
        raise AlertException(f"{token} : 토큰이 유효하지 않습니다. 새로고침후 다시 시도해 주세요.", 403)
    
    poll_etc = db.query(PollEtc).get(pc_id)
    po_id = poll_etc.po_id
    member = request.state.login_member
    member_level = get_member_level(request)

    if poll_etc.mb_id != member.mb_id and not member_level == 10:
        raise AlertException(status_code=403, detail=f"작성자만 삭제할 수 있습니다.")

    db.delete(poll_etc)
    db.commit()
        
    return RedirectResponse(url=f"/bbs/poll_result/{po_id}", status_code=302)