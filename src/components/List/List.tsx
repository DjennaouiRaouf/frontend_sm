import * as React from "react";

type ListsProps = {
  
};

const List: React.FC<any> = () => {
  const columns:any = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];

  const rows:any = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
  ];
  return (
      <>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 text-nowrap">
                        <div
                            id="dataTable_length"
                            className="dataTables_length"
                            aria-controls="dataTable"
                        />
                      </div>
                      <div className="col-md-6">
                        <div
                            id="dataTable_filter"
                            className="text-md-end dataTables_filter"
                        >
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search" />
                            &nbsp;Recherche
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                        id="dataTable"
                        className="table-responsive table mt-2"
                        role="grid"
                        aria-describedby="dataTable_info"
                    >

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
  );
};

export default List;
