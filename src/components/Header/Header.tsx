import React, {FC} from "react";
import Logo from '../Logo';

const Header: FC = () => {
    return (
        <div className="header_container">
            <Logo/>
        </div>
    );
};

export default Header;