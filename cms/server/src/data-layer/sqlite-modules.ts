import db from "../data-layer/sqlite-demo";
import { IModule } from "../data-layer/models/models";
import { ObjectId } from "mongodb";

export function getAllModules(): IModule[] {
  const modules = db.prepare("SELECT * FROM newmodules").all() as IModule[];

  const getSubsections = db.prepare("SELECT id FROM subsections WHERE module_id = ?");
  const getQuizzes = db.prepare("SELECT id FROM quizzes WHERE module_id = ?");
  const getLinks = db.prepare("SELECT id FROM links WHERE module_id = ?");

  const result = modules.map((m) => ({
    ...m,
    subsectionIds: (getSubsections.all(m.id) as { id: number }[]).map((r) => r.id) as unknown as ObjectId[],
    quizIds: (getQuizzes.all(m.id) as { id: number }[]).map((r) => r.id) as unknown as ObjectId[],
    linkIds: (getLinks.all(m.id) as { id: number }[]).map((r) => r.id) as unknown as ObjectId[],
  }));
  return result as unknown as IModule[];
}
