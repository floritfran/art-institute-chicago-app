import Realm from 'realm';

import {Configuration} from './RealmConfiguration';

class RealmDB {
  constructor() {
    this.schemas = {};
    this.subscribers = {};
    this.subscribeSchemasChanges();
    this.openRealmDatabase();
    this.loaded = false;
  }

  isLoaded() {
    return this.loaded;
  }

  async openRealmDatabase() {
    this.schemas = Configuration.schemas;

    try {
      this.realm = await Realm.open({
        path: 'realm_database',
        schema: Object.values(this.schemas),
      });
      this.loaded = true;
    } catch (error) {
      console.error('openRealmDatabase');
      console.error(error);
    }
  }

  closeRealmDataBase() {
    try {
      this.realm.close();
    } catch (error) {
      console.error('closeRealmDataBase');
      console.error(error);
    }
  }

  saveToSchema(schema: string, items: any) {
    const realm_database = this.realm;

    try {
      realm_database.write(() => {
        items.forEach(async (item: any) => {
          realm_database.create(schema, item, 'modified');
        });
      });
    } catch (error: any) {
      console.error('writeObject');
      console.error(error.stack);
    }
  }

  deleteById(schema: string, id: Realm.PrimaryKey): void {
    try {
      this.realm.write(() => {
        let object = this.findById(schema, id);

        if (object !== null) {
          this.realm.delete(object);
          object = null;
        }
      });
    } catch (error) {
      console.error('deleteObject');
      console.error(error);
    }
  }

  // GETTERS

  findById<T>(schema: string, id: Realm.PrimaryKey): (T & Realm.Object) | null {
    if (!id) {
      return;
    }

    try {
      return this.realm.objectForPrimaryKey(schema, id);
    } catch (error) {
      console.error('findById');
      console.error(error);

      return null;
    }
  }

  findAll<T>(schema: string): Realm.Results<T & Realm.Object> {
    try {
      const objects = this.realm.objects(schema);

      return objects;
    } catch (error) {
      console.error('findAll', schema);
      console.error(error);

      return {} as Realm.Results<T & Realm.Object>;
    }
  }

  runSuscribersByActionCallBacks(schema: string, params: any) {
    this.subscribers[schema].forEach((func: any) => {
      func(params);
    });
  }

  subscribeSchemasChanges() {
    for (let value in this.schemas) {
      this.subscribers[value] = [];
      const schema = this.findAll(value);
      schema.addListener((objects, changes) =>
        this.runSuscribersByActionCallBacks(value, objects),
      );
    }
  }

  subscribeToSchemaChanges(schema: string, callback: Function) {
    this.subscribers[schema].push(callback);
  }
}

export default new RealmDB();
