import { useContext, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { 
    FormContainer, 
    MinutesAmountInput, 
    TaskInput 
} from "./styles";
import { CyclesContext } from '../..';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'You should add a valid task'),
    minutesAmount: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

type Cycle = {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    activeCycle.startDate
                );
                if (secondsDifference >= totalSeconds) {
                    setCycles(state => state.map(cycle => {
                        if (cycle.id === activeCycleId) {
                            return {...cycle, finishedDate: new Date()};
                        } else {
                            return cycle;
                        }
                    }));
                    setAmountSecoundsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecoundsPassed(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, activeCycleId, totalSeconds]);

    const currentSeconds = activeCycle ? totalSeconds - amountSecoundsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `Pomodoro: ${minutes}:${seconds}`;
        }
    }, [activeCycle, minutes, seconds]);

    const task = watch('task');
    const isSubmitDisabled = !task;

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
            <datalist id='task-suggestions'>
                <option value="Project1" />
                <option value="Project2" />
                <option value="Project3" />
                <option value="Project4" />
            </datalist>

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