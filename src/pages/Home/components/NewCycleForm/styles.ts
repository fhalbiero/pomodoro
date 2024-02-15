import styled from 'styled-components';

export const HomeContainer = styled.main`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;

    @media (max-width: 600px){
        flex-direction: column;
        align-items: flex-start;
        padding: 18px;
    }
`;

const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.25rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};
    
    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme['green-500']};;
    }

    &::placeholder {
        color: ${props => props.theme['gray-500']};
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;
    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;