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

export default function MainNav(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isExpanded, setIsExpanded] = useState(false);

    const {register, handleSubmit} = useForm({
        defaultValues:{
            searchInput: "",
        },
    });

    const router = useRouter();

    function submitForm(input){
        let url = "/artwork?";
        let query = "title=true&q=" + input.searchInput;
        setIsExpanded(false);

        setSearchHistory(current => [...current, query]);

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
                            <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                {...register("searchInput")}
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                                <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar><br /><br />
        </>
    );
}