interface TedBy {
  object: string;
  id: string;
}

interface Parent {
  type: string;
  databaseID: string;
}

interface Properties {
  period: Period;
  thumb: Thumb;
  type: Type;
  website: Website;
  skills: Skills;
  name: Name;
}

interface Name {
  id: string;
  type: string;
  title: Title[];
}

interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Text {
  content: string;
  link: null;
}

interface Period {
  id: string;
  type: string;
  date: DateClass;
}

interface DateClass {
  start: string;
  end: string;
  timeZone: null;
}

interface Skills {
  id: string;
  type: string;
  rich_text: Title[];
}

interface Thumb {
  id: string;
  type: string;
  files: FileElement[];
}

interface FileElement {
  name: string;
  type: string;
  file: FileFile;
}

interface FileFile {
  url: string;
  expiryTime: Date;
}

interface Type {
  id: string;
  type: string;
  select: Select;
}

interface Select {
  id: string;
  name: string;
  color: string;
}

interface Website {
  id: string;
  type: string;
  url: string;
}

interface IPosts {
  object: string;
  id: string;
  createdTime: Date;
  lastEditedTime: Date;
  createdBy: TedBy;
  lastEditedBy: TedBy;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  inTrash: boolean;
  properties: Properties;
  url: string;
  publicURL: string;
}

export type NotionResults = IPosts[]; // 배열 타입으로 명확히
