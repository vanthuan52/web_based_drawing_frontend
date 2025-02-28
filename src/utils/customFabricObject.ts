import {FabricObject} from 'fabric';
import {v4 as uuidv4} from 'uuid';

/**
 * This custom class does not work
 */
class CustomFabricObject extends FabricObject {
  id?: string;
  name?: string;
  status?: string;

  constructor(options: any) {
    super(options);
    this.id = options.id || `${uuidv4()}`;
    this.name = options.name || `${options.type}`;
    this.status = options.status ?? true;
  }

  toObject(propertiesToInclude: string[] = []): Record<string, any> {
    console.log('call here');
    return {
      ...super.toObject([...propertiesToInclude, 'id', 'name', 'status']),
      id: this.id,
      name: this.name,
      status: this.status,
    };
  }
}
