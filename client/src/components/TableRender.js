import React, {useEffect} from 'react'
import { useTable } from 'react-table'
import { useSelector } from 'react-redux';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

function TableRender({ apiData }) {
	const orgInfo = useSelector(state => state.apiData)
	
	const data = React.useMemo(
		() => apiData,
		[]
	)
	
	const columns = React.useMemo(
		() => [
			{
				Header: 'Organisasjonsnummer',
				accessor: 'organisasjonsnummer', // accessor is the "key" in the data
			},
			{
				Header: 'Selskapsnavn',
				accessor: 'navn',
			},
			{
				Header: 'Kommune',
				accessor: 'forettningsadresse',
			},
		],
		[]
	)

	const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable({
    columns,
    data,
	})

	return (
		<>
      <div>
        <div>
					<IndeterminateCheckbox
						{...getToggleHideAllColumnsProps()}
					/>
					 Toggle All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
							<input type="checkbox"
								{...column.getToggleHiddenProps()}
							/>{' '}
								{column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
			<table
				{...getTableProps()}
			>
        <thead>
          {headerGroups.map(headerGroup => (
						<tr 
							{...headerGroup.getHeaderGroupProps()}
						>
							{
								headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))
							}
            </tr>
          ))}
        </thead>
				<tbody
				 	{...getTableBodyProps()}
				 >
					{
						rows.map((row, i) => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})
					}
        </tbody>
      </table>
      <pre>
				{JSON.stringify(state, null, 2)}
			</pre>
    </>	
	)
}



export default TableRender;