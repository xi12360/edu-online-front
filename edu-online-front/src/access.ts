/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const {currentUser} = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'canAdmin',
    canTeacher: currentUser && currentUser.access === 'canTeacher',
    canStudent: currentUser && currentUser.access === 'canStudent',
    notAdmin: currentUser && currentUser.access != 'canAdmin',
  };
}
