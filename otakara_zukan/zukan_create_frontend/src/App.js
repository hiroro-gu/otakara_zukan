import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';
import IllustratedBooks from './components/IllustratedBooks';
import { CreateIllustratedBook } from './components/CreateIllustratedBook';
import { UserManagement } from './components/dashboard//UserManagement';
import { PostManagement } from './components/dashboard//PostManagement';
import { TemplateManagement } from './components/dashboard//TemplateManagement';
import { FieldManagement } from './components/dashboard/FieldManagement';
import { ShowIllustratedBook } from './components/ShowIllustratedBook';
import TopPage from './components/TopPage';
import { UpdateIllustratedBook } from './components/UpdateIllustratedBook';
import { RequireAdmin } from './RequireAdmin';
import { PolicyViewer } from './components/PolicyViewer';
import useAnalytics from './services/analytics';

function App() {
  return (
    <Router>
      <AnalyticsTracker>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/illustratedbooks" element={<IllustratedBooks />} />
          <Route path="/illustrated_books/:id" element={<ShowIllustratedBook />} />
          <Route path="/new" element={<CreateIllustratedBook />} />
          <Route path="/user/illustrated_books/:id" element={<UpdateIllustratedBook />} />
          <Route path="/terms" element={<PolicyViewer />} />
          <Route path="/dashboard/*" element={
            <RequireAdmin>
              <Routes>
                <Route path="users" element={<UserManagement />} />
                <Route path="posts" element={<PostManagement />} />
                <Route path="templates" element={<TemplateManagement />} />
                <Route path="fields" element={<FieldManagement />} />
                {/*<Route path='icons' element={<IconManagement />} />*/}
              </Routes>
            </RequireAdmin>
          } />
        </Routes>
      </AnalyticsTracker>
    </Router>
  );
}

function AnalyticsTracker({ children }) {
  useAnalytics(); 
  return <>{children}</>;
}

export default App;