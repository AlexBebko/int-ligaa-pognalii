import { Helmet } from 'react-helmet-async';
import Directions from '../../components/directions/directions';
import Intro from '../../components/intro';
import Plan from '../../components/plan/plan';

function MainPage() {
    return (
        <main>
            <Helmet>
                <title>Форма</title>
                <meta name="description" content="Форма" />
            </Helmet>
            <Intro title={'направления'} />
            <Directions />
            <Plan />
        </main>
    );
}

export default MainPage;
