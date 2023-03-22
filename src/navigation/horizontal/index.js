// ** Navigation imports
import apps from './apps'
import pages from './pages'
import others from './others'
import charts from './charts'
// import dashboards from './dashboards'
import uiElements from './ui-elements'
import formsAndTables from './forms-tables'

// ** Merge & Export
export default [...apps, ...uiElements, ...formsAndTables, ...pages, ...charts, ...others]
