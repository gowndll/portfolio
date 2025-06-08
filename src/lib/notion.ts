import { cache } from "react";
import { Client } from "@notionhq/client";
import { NotionResults } from "@/app/api/IPost";

const token = process.env.NOTION_API_KEY;
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

if (!token) {
  throw new Error("❌ NOTION_TOKEN이 설정되지 않았습니다.");
}

export const getDatabase = cache(async (): Promise<NotionResults> => {
  console.log("🔄 Notion API 호출!");
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results as NotionResults;
});

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};
