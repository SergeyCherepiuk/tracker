import ElementsList from '../components/ElementsList';
import ElementsChart from '../components/ElementsChart';
import SideBar from '../components/SideBar';

const Home = () => {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="grid grid-rows-5 gap-y-5 pt-8 col-start-2 col-end-6 h-screen">
        <ElementsChart className="row-span-2"/>
        <ElementsList className="row-span-3"/>
      </div>
      <SideBar className="col-span-2 pt-8"/>
    </div>
  );
}

export default Home;
