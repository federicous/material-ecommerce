import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Return = () => {
	return (
		<Link
		style={{
		  textDecoration: "none",
		  color: "inherit",
		  display: "flex",
		  flexDirection: "row",
		  alignItems: "center",
		}}
		to={`/`}
	      >
		<Button size="small" variant="contained" color="primary">
		  return
		</Button>
	      </Link>
	)
}

export default Return
