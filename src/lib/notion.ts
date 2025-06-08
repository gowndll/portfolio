import { cache } from "react";
import { Client } from "@notionhq/client";
import { NotionResults } from "@/app/api/IPost";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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
