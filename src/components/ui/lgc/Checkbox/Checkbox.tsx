import { EntityCallback, EntityEvents } from '@vanyamate/lgc';
import React, { useCallback, useEffect, useState } from 'react';
import { CheckboxEvents, ICheckbox } from '../../../../modules/ui/Checkbox/Checkbox.ts';


export type CheckboxProps = {
    module: ICheckbox;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { module }          = props;
    const [ state, setState ] = useState<boolean>(module.value);

    const onToggle = useCallback<EntityCallback<EntityEvents<CheckboxEvents>['toggle']>>((state) => {
        setState(state);
    }, [ state ]);

    const onClick = useCallback(() => {
        module.toggle();
    }, [ module ]);

    useEffect(() => {
        module.subscribe('toggle', onToggle);

        return () => {
            module.unsubscribe('toggle', onToggle);
        };
    }, [ onToggle, module ]);

    return (
        <div onClick={ onClick }>
            [ { state.toString() } ]
        </div>
    );
};

export default Checkbox;