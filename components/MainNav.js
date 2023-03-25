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

export default function MainNav(){
    const [isExpanded, setIsExpanded] = useState(false);

    const {register, handleSubmit} = useForm({
        defaultValues:{
            searchInput: "",
        },
    });

    const router = useRouter();

    function submitForm(input){
        let url = "/artwork?title=true&q=" + input.searchInput;
        setIsExpanded(false);

        router.push(url);
    }

    return (
        <>
            <Navbar expanded={isExpanded} className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Tom Bragagnolo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Advanced Search</Nav.Link>
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
                                <NavDropdown.Item href="/favourites">Favourites</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar><br /><br />
        </>
    );
}