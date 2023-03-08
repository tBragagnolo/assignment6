export default function MainNav(){
    return (
        <>
            <Navbar className="fixed-top navbar-dark" bg="primary">
                <Container>
                    <Navbar.Brand>Tom Bragagnolo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/search">Advanced Search</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}