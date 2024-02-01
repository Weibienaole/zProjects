import React, { useEffect, memo, useState } from 'react'
import PropsType from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CoreContainer } from './style'

const Core = (props) => {
  const { history } = props

  useEffect(() => {}, [])

  return (
    <CoreContainer>
      CoreContainer
    </CoreContainer>
  )
}

Core.defaultProps = {}

Core.propTypes = {
  history: PropsType.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(memo(Core)))
