import { EntityEvents, EntitySubscribers, IEntity } from '@vanyamate/lgc';
import Entity from '@vanyamate/lgc/entity/Entity.ts';


export type CheckboxEvents = {
    toggle: boolean;
}

export interface ICheckbox extends IEntity<EntityEvents<CheckboxEvents>> {
    value: boolean;

    toggle (state?: boolean): Promise<boolean>;
}

export default class Checkbox extends Entity<EntityEvents<CheckboxEvents>> implements ICheckbox {
    constructor (private _value: boolean, subscribers?: EntitySubscribers<EntityEvents<CheckboxEvents>>) {
        super(subscribers);
        this._executeInit();
    }

    public get value (): boolean {
        return this._value;
    }

    public toggle (state?: boolean): Promise<boolean> {
        return new Promise(async (resolve) => {
            await this._executeProcess(true);

            this._value = state ?? !this._value;
            await this._execute('toggle', this._value);

            await this._executeProcess(false);
            resolve(this._value);
        });
    }
}