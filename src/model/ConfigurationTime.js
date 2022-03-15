import { types } from 'mobx-state-tree';

export default types.model('ConfigurationTime', {
configurationId: types.identifier,
startTime: types.Date,
endTime: types.Date,
});
