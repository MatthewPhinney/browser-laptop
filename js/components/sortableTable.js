/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const ImmutableComponent = require('./immutableComponent')
const tableSort = require('tablesort')

/**
 * Represents a sortable table with supp
 */

class SortableTable extends ImmutableComponent {
  componentDidMount (event) {
    return tableSort(document.getElementsByClassName('sortableTable')[0])
  }

  render () {
    let headings = []
    let rows = []
    let columnClassNames = []

    if (!this.props.headings || !this.props.rows) {
      return false
    }

    if (this.props.columnClassNames && this.props.columnClassNames.length === this.props.headings.length) {
      this.props.columnClassNames.forEach((className) => columnClassNames.push(className))
    }

    for (let i = 0; i < this.props.rows.length; i++) {
      rows[i] = []
      for (let j = 0; j < this.props.headings.length; j++) {
        headings[j] = headings[j] || <th className='sort-header' data-l10n-id={this.props.headings[j]} />
        if (columnClassNames[j]) {
          rows[i][j] = <td className={columnClassNames[j]} data-sort={this.props.rows[i][j]}>{this.props.rows[i][j] === true ? '✕' : this.props.rows[i][j]}</td>
        } else {
          rows[i][j] = <td data-sort={this.props.rows[i][j]}>{this.props.rows[i][j] === true ? '✕' : this.props.rows[i][j]}</td>
        }
      }

      // TODO: break out to functions

      const handlerInput = this.props.rowObjects ? (typeof this.props.rowObjects[i].toJS === 'function' ? this.props.rowObjects[i].toJS() : this.props.rowObjects[i]) : rows[i]

      const rowProps = {}
      if (this.props.addHoverClass) {
        rowProps.className = 'rowHover'
      }
      if (this.props.onClick) {
        rowProps.onClick = this.props.onClick.bind(this, handlerInput)
      }
      if (this.props.onDoubleClick) {
        rowProps.onDoubleClick = this.props.onDoubleClick.bind(this, handlerInput)
      }
      if (this.props.onContextMenu && this.props.contextMenuName) {
        rowProps.onContextMenu = this.props.onContextMenu.bind(this, handlerInput, this.props.contextMenuName)
      }

      rows[i] = this.props.onContextMenu
      ? <tr {...rowProps} data-context-menu-disable>{rows[i]}</tr>
      : rows[i] = <tr {...rowProps}>{rows[i]}</tr>
    }
    return <table className='sortableTable sort'>
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }
}

SortableTable.defaultProps = {
  headings: React.PropTypes.array.isRequired,
  rows: React.PropTypes.array.isRequired,
  columnClassNames: React.PropTypes.array,
  addHoverClass: React.PropTypes.bool,
  contextMenuName: React.PropTypes.string
}

module.exports = SortableTable
