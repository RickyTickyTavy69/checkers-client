import React from "react";
import s from "./NavBar.module.css"

interface props{
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<props> = ({setOpenModal, setOpenModalLogin}) => {

    const hanldeOpen = () => {
        setOpenModal(true);
    }

    const hanldeOpenLogin = () => {
        setOpenModalLogin(true);
    }

    return(
        <section className={s.navSection}>
            <nav className={s.navigation}>
                <ul className={s.navList}>
                    <li className={s.navItem}>Home</li>
                    <li onClick={hanldeOpen} className={s.navItem}>Authorization</li>
                    <li onClick={hanldeOpenLogin} className={s.navItem}>Login</li>
                </ul>
            </nav>
        </section>
    )

}

export default NavBar;