import { HeaderContainer } from "./styles";
import { Timer, Scroll} from "phosphor-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "styled-components";

export function Header() {
    const color = useTheme();
    return (
        <HeaderContainer>
            <Timer size={84} color={color["green-500"]}/>
            <h1><strong>Tomma</strong>timer</h1>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}