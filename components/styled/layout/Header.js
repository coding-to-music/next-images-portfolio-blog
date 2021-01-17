import React from "react";
import styled from "styled-components";
import Link from "next/link";
import MenuButton from "../element/MenuButton";
import { elevation } from "../utilities";

const Header = ({ className }) => {
  return (
    <header className={className}>
      <div className='menu'>
        <Link href='/'>
          <a>
            <h1>Own Kng</h1>
          </a>
        </Link>
        <ul>
          <MenuButton />
        </ul>
      </div>
    </header>
  );
};

export default styled(Header)`
  position: sticky;
  top: 0px;
  height: 4rem;
  width: 100;
  z-index: 4;
  ${elevation[1]};

  .menu {
    display: flex;
    justify-content: space-between;
    place-items: center;
    height: 100%;
    width: 96%;
    max-width: 1200px;
    background: rgba(2, 10, 18, 1);
    opacity: 0.9;
    backdrop-filter: blur(4px);
    margin: 0 auto;
    padding: 0px 5px;
  }

  h1 {
    color: ${(props) => props.theme.colors.headline};
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.headline};
    padding: 1rem 0rem;
  }
`;
