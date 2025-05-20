import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SQLiteService {
  db: any;

  constructor(private sqlite: SQLiteConnection) {}

  async init() {
    const ret = await this.sqlite.createConnection('favorites-db', false, 'no-encryption', 1, false);
    this.db = ret;
    await this.db.open();
    await this.db.execute(`CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY, data TEXT)`);
  }

  async isFavorite(id: string): Promise<boolean> {
    const res = await this.db.query(`SELECT id FROM favorites WHERE id = ?`, [id]);
    return res.values.length > 0;
  }

  async addToFavorites(item: any) {
    const json = JSON.stringify(item);
    await this.db.run(`INSERT INTO favorites (id, data) VALUES (?, ?)`, [item.id, json]);
  }

  async removeFromFavorites(id: string) {
    await this.db.run(`DELETE FROM favorites WHERE id = ?`, [id]);
  }
}
