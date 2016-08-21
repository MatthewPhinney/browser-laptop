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
      rows[i] = <tr className={this.props.isHover ? 'rowHover' : ''}
        onClick={this.props.hoverCallback.bind(this, rows[i])}>{rows[i]}</tr>
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
  isHover: React.PropTypes.bool,
  hoverCallback: React.PropTypes.func
}

module.exports = SortableTable
