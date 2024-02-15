import { HeaderContainer } from "./styles";
import { Timer, Scroll} from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <h1><strong>Pomodoro</strong></h1>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={28} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={28} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}