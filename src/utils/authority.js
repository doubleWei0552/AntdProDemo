// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  // console.log('str', str)
  // const authorityString =
  //   typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // // authorityString could be admin, "admin", ["admin"]
  // let authority;
  // try {
  //   authority = JSON.parse(authorityString);
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // return authority || ['admin'];
  return ['admin']
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', 'admin');
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  // return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
