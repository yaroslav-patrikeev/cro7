import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Account from './components/screens/Account/Account';
import AddStudentsList from './components/screens/AddStudentsList/AddStudentsList';
import Auth from './components/screens/Auth/Auth';
import CheckScorecardsAdministration from './components/screens/CheckScorecardsAdministration/CheckScorecardsAdministration';
import CheckScorecardsSoviet from './components/screens/CheckScorecardsSoviet/CheckScorecardsSoviet';
import FillScorecard from './components/screens/FillScorecard/FillScorecard';
import Home from './components/screens/Home/Home';
import Lunch from './components/screens/Lunch/Lunch';
import Register from './components/screens/Register/Register';
import ScorecardsDesigner from './components/screens/ScorecardsDesigner/ScorecardsDesigner';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import api from './utils/api';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		api.getUser().then(user => {
			setIsLoggedIn(true);
			if (location.pathname === '/sign-in') {
				navigate('/');
			} else {
				navigate(location.pathname);
			}
			setCurrentUser(user.data);
		});
	}, [isLoggedIn]);

	const onLogin = async data => {
		await api.login(data);
		setIsLoggedIn(true);
		navigate('/');
	};

	const handleAddLunch = date => {
		return api.addLunch({ date });
	};

	const handleDeleteLunch = date => {
		return api.deleteLunch({ date });
	};

	const onScorecards = async () => {
		const scorecards = await api.getAllScorecards();
		return scorecards;
	};

	const onCreateScorecardPattern = data => {
		return api.createScorecardPattern(data);
	};

	const getAllPatterns = async () => {
		return await api.getAllPatterns();
	};

	const updatePattern = data => {
		return api.updatePattern(data);
	};

	const deletePattern = id => {
		return api.deletePattern(id);
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Routes>
				<Route path='/sign-in' element={<Auth onLogin={onLogin} />} />
				<Route
					path='/'
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn} component={<Home />} />
					}
				/>
				<Route
					path='/user'
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn} component={<Account />} />
					}
				/>
				<Route
					path='/lunch'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={
								<Lunch
									handleAddLunch={handleAddLunch}
									handleDeleteLunch={handleDeleteLunch}
									setCurrentUser={setCurrentUser}
								/>
							}
						/>
					}
				/>
				<Route
					path='/sign-up'
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn} component={<Register />} />
					}
				/>
				<Route
					path='/add-students-list'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={<AddStudentsList />}
						/>
					}
				/>
				<Route
					path='/fill-scorecard'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={<FillScorecard />}
						/>
					}
				/>
				<Route
					path='/check-scorecards-soviet'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={<CheckScorecardsSoviet onScorecards={onScorecards} />}
						/>
					}
				/>
				<Route
					path='/check-scorecards-administration'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={
								<CheckScorecardsAdministration
									onScorecards={onScorecards}
									getAllPatterns={getAllPatterns}
								/>
							}
						/>
					}
				/>
				<Route
					path='/scorecards-designer'
					element={
						<ProtectedRoute
							isLoggedIn={isLoggedIn}
							component={
								<ScorecardsDesigner
									onCreateScorecardPattern={onCreateScorecardPattern}
									getAllPatterns={getAllPatterns}
									updatePattern={updatePattern}
									deletePattern={deletePattern}
								/>
							}
						/>
					}
				/>
			</Routes>
		</CurrentUserContext.Provider>
	);
}

export default App;
