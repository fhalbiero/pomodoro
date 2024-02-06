import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
    FormContainer, 
    MinutesAmountInput, 
    TaskInput 
} from "./styles";
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">My task is</label>
            <TaskInput 
                id="task" 
                type="text" 
                list="task-suggestions"
                placeholder="Name your project" 
                disabled={!!activeCycle}
                {...register('task')}
            />
            <datalist id='task-suggestions' />

            <label htmlFor="minutesAmount">for</label>
            <MinutesAmountInput 
                id="minutesAmount" 
                type="number" 
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true})}
            />

            <span>minutes</span>
        </FormContainer>
    )
}