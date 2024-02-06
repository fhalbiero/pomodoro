import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { 
    addNewCycleAction, 
    interruptCurrentCycleAction, 
    markCurrentCycleAsFinishedAction 
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

type CreateCycleData = {
    task: string;
    minutesAmount: number;
}

type CyclesContextType = {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecoundsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

type CyclesContextProviderProps = {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, { 
        cycles: [], 
        activeCycleId: null 
    }, (initialState) => {
        const storageStateAsJSON = localStorage.getItem('@pomodoro-app:cycles-state-1.0.0');
        if (storageStateAsJSON) {
            return JSON.parse(storageStateAsJSON);
        }

        return initialState;
    });
    
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find( cycle => cycle.id === activeCycleId);

    const [amountSecoundsPassed, setAmountSecoundsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }

        return 0;
    });
    

    function setSecondsPassed(seconds: number) {
        setAmountSecoundsPassed(seconds);
    }


    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(addNewCycleAction(newCycle));
        setAmountSecoundsPassed(0);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());       
    }

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem('@pomodoro-app:cycles-state-1.0.0', stateJSON);
    }, [cycles, cyclesState]);

    return (
        <CyclesContext.Provider value={{ 
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished,
            amountSecoundsPassed,
            setSecondsPassed, 
            createNewCycle,
            interruptCurrentCycle,
        }}>
            {children}
        </CyclesContext.Provider>
    )
}