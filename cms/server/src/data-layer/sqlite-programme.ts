import { IProgramme } from "./models/models";
import db from "./sqlite-demo";


export function getAllProgrammes():IProgramme[] {
    const stmt = db.prepare("SELECT * FROM programmes");
    const programmes = stmt.all() as IProgramme[];
    return programmes;
}