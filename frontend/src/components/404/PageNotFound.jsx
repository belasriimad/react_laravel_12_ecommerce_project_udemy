import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='row my-5'>
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-body d-flex flex-column justify-content-center">
                        <h3 className="text-center mb-2">
                            404 Page Not Found
                        </h3>
                        <Link to="/" className="btn btn-link text-decoration-none">
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
