import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';

export default function MainNav(){
    const {register, handleSubmit} = useForm({
        defaultValues:{
            searchInput: "",
        },
    });

    function submitForm(input){
        const router = useRouter();
        let url = "/artwork?title=true&q=" + input.searchInput;

        router.push(url);
    }

    return (
        <>
            <Navbar className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Tom Bragagnolo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Advanced Search</Nav.Link>
                        </Nav>
                        <Form className="d-flex" action="/artwork/10496">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar><br /><br />
        </>
    );
}