import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Search from './components/search';

export default class App extends Component {
	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col md="10" className="mt-5">
							<Search />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}