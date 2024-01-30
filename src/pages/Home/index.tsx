import { useContext } from 'react';
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
import { CyclesContext } from '../../contexts/CyclesContext';


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

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const {watch, handleSubmit, reset} = newCycleForm;  
    
    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action=""> 
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                { activeCycle ? (
                    <StopCountdownButton 
                        type="button"
                        onClick={interruptCurrentCycle}
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