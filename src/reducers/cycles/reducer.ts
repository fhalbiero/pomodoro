import { ActionTypes } from "./actions";
import { produce } from 'immer';

export type Cycle = {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

type CyclesState = {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            /* return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle], 
                activeCycleId: action.payload.newCycle.id
            } */
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id
            });
        case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
            /* return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, interruptedDate: new Date()};
                    } else {
                        return cycle;
                    }
                }), 
                activeCycleId: null
            } */
            const currentCycleIdx = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId );
            if (currentCycleIdx < 0) return state;

            return produce(state, draft => {
                draft.cycles[currentCycleIdx].interruptedDate = new Date();
                draft.activeCycleId = null;
            });
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
            /* return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, finishedDate: new Date()};
                    } else {
                        return cycle;
                    }
                }), 
                activeCycleId: null
            } */
            const currentCycleIdx = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId );
            if (currentCycleIdx < 0) return state;

            return produce(state, draft => {
                draft.cycles[currentCycleIdx].finishedDate = new Date();
                draft.activeCycleId = null;
            });
        }
        default: 
            return state;
    }
}