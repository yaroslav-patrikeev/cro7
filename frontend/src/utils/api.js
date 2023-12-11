import axios from 'axios';
import { apiUrl } from '../constants/path.constants';

class Api {
	constructor() {
		this.axios = axios.create({
			baseURL: apiUrl,
			withCredentials: true,
		});
	}

	login(data) {
		return this.axios.post('/login', data);
	}

	getUser() {
		return this.axios.get('/users/user');
	}

	addLunch(date) {
		return this.axios.put('/lunch/add', date);
	}

	deleteLunch(date) {
		return this.axios.put('/lunch/delete', date);
	}

	addStudentsList(data) {
		return axios
			.create({
				baseURL: apiUrl,
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.post('/student-list/add', data);
	}

	getAllScorecards() {
		return this.axios.get('/scorecard/get-all');
	}

	createScorecardPattern(data) {
		return this.axios.post('/scorecard/create-pattern', data);
	}

	getAllPatterns() {
		return this.axios.get('/scorecard/get-all-patterns');
	}

	updatePattern(data) {
		return this.axios.patch('/scorecard/update-pattern', data);
	}

	deletePattern(id) {
		return this.axios.delete(`/scorecard/delete/${id}`);
	}
}

export default new Api();
