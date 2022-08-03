import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Pagination,PaginationItem, Stack, Typography } from '@material-ui/core/';
// import PaginationItem from '@material-ui/core/PaginationItem';


export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);

  let location = useLocation();
  let navigate = useNavigate();  

  const handleChange = (event, value) => {
    setPage(value);
  };

  // useEffect(() => {
	// 	if (page) {
  //     console.log(page);
  //     console.log(location);
	// 		navigate(`/search/${page}`);	
	// 	} else {
	// 		navigate(`/`);
	// 	}

  // }, [page]);

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}



// function Content() {
//   const [pageApi, setPageApi] = useState(1);
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const page = parseInt(query.get('page') || '1', 10);
//   console.log(location.pathname);

//   let navigate = useNavigate();

//   useEffect(() => {
// 		if (pageApi) {
//       console.log(pageApi);
//       console.log(location);
// 			navigate(`${location.pathname}?page${pageApi}`, { replace: true });	
// 		} else {
// 			navigate(`/`, { replace: true });
// 		}

//   }, [pageApi]);

//   return (
//     <Pagination
//       page={page}
//       count={10}
//       renderItem={(item) => (
//         <PaginationItem
//           component={Link}
//           to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
//           onClick={(e, item) => setPageApi(item.page)}
//           {...item}
//         />
//       )}
//     />
//   );
// }

// export default function PaginationLink() {
//   return (
// //     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
// //       <Routes>
// //         <Route path="*" element={<Content />} />
// //       </Routes>
// //     </MemoryRouter>
//     <Content />
//   );
// }







// import React from 'react';
// import { MemoryRouter, Route } from 'react-router';
// import { Link } from 'react-router-dom';
// import Pagination from '@material-ui/core/Pagination';
// import PaginationItem from '@material-ui/core/PaginationItem';

// export default function PaginationLink() {
//   return (
//     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
//       <Route>
//         {({ location }) => {
//           const query = new URLSearchParams(location.search);
//           const page = parseInt(query.get('page') || '1', 10);
//           return (
//             <Pagination
//               page={page}
//               count={10}
//               renderItem={(item) => (
//                 <PaginationItem
//                   component={Link}
//                   to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
//                   {...item}
//                 />
//               )}
//             />
//           );
//         }}
//       </Route>
//     </MemoryRouter>
//   );
// }
