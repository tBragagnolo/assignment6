import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isExpanded, setIsExpanded] = useState(false);

    let token = readToken();

    const {register, handleSubmit} = useForm({
        defaultValues:{
            searchInput: "",
        },
    });

    const router = useRouter();

    function logout(){
        setIsExpanded(false);
        removeToken();
        router.push("/login");
    }

    async function submitForm(input){
        let url = "/artwork?";
        let query = "title=true&q=" + input.searchInput;
        setIsExpanded(false);

        //setSearchHistory(current => [...current, query]);
        setSearchHistory(await addToHistory(`title=true&q=${input.searchInput}`)) 

        url += query;
        router.push(url);
    }

    return (
        <>
            <Navbar expanded={isExpanded} className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Tom Bragagnolo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"}>Home</Nav.Link></Link>
                            {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
                        </Nav>
                        {!token &&
                           <Nav>
                                <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"}>Register</Nav.Link></Link>
                                <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"}>Login</Nav.Link></Link>
                           </Nav> 
                        }
                        {token && <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                {...register("searchInput")}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>}
                        <Nav>
                            {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                                <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar><br /><br />
        </>
    );
}