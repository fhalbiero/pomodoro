import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { HandPalm, Play } from "phosphor-react";
import {  
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';


//controlled
//benefit: easly access values and show the UI updates
//cons: each change React will recalculate all the Virtual dom

//uncontrolled
//benefit: better performance no rerender needed
//cons: cant use values to update visual components
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

type CyclesContextType = {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecoundsPassed: number;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecoundsPassed, setAmountSecoundsPassed] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const {watch, handleSubmit, reset} = newCycleForm;

    function markCurrentCycleAsFinished() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {...cycle, finishedDate: new Date()};
            } else {
                return cycle;
            }
        }));
    }

    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        setCycles( state => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecoundsPassed(0);
        reset();
    }

    function handleStopCycle() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {...cycle, interruptedDate: new Date()};
            } else {
                return cycle;
            }
        }));
        setActiveCycleId(null);
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{ 
                    activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished,
                    amountSecoundsPassed, 
                }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                { activeCycle ? (
                    <StopCountdownButton 
                        type="button"
                        onClick={handleStopCycle}
                    >
                        <HandPalm size={24} />
                        Stop
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Start
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}