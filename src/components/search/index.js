import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label } from 'reactstrap';
import TextField from 'material-ui/TextField';
import Card from '../card';

var timer;
var saveSearch;
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            filterData: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event) {
        this.setState({
            searchTerm: event.target.value
        });
        if (this.state.searchTerm && saveSearch !== this.state.searchTerm) {
            saveSearch = this.state.searchTerm;
            this.myFunction();
        }
    }

    dataDetails() {
        clearTimeout(timer);
        document.getElementById("searchField").disabled = true;
        fetch('http://hn.algolia.com/api/v1/search?query=' + this.state.searchTerm)
            .then((result) => {
                document.getElementById("searchField").disabled = false;
                document.getElementById("searchField").focus();
                return result.json();
            }).then((jsonResult) => {
                document.getElementById("searchField").disabled = false;
                document.getElementById("searchField").focus();
                this.setState({ "filterData": jsonResult });
            }).catch((error) => {
                document.getElementById("searchField").disabled = false;
                document.getElementById("searchField").focus();
                console.log(error)
            })
    }
    myFunction() {
        timer = setTimeout(this.dataDetails.bind(this), 1000);
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="12">
                            <Form>
                                <FormGroup row>
                                    <Label for="searchData">Search Here</Label>
                                    <TextField id="searchField" onChange={this.changeHandler} className="pl-2"/>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {
                            <div>
                                {this.state.filterData.hits && this.state.filterData.hits.map((item, index) =>
                                    <Col key={index} className="p-0">
                                        <Card>
                                            {item.title}
                                        </Card>
                                    </Col>
                                )}
                            </div>
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

