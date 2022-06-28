import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../../hooks/usePagination/usePagination';
import { selectUserRequests } from '../../slices/requestSlice';

import style from './MyRequests.module.css';

const MyRequests: React.FC = () => {
  const requests : any = useSelector(selectUserRequests)
  const pagination = usePagination(10, 'requests');

	return (
		<div>
			<section className={style.container}>
				<h1>TODAS MIS PETICIONES</h1>
				<div className={style.cardEvent}>
					{requests &&
						requests?.rows?.map((request: any) => {
							return (
									<React.Fragment key={request.id}>
										<fieldset
											className={style.fieldset_event_detail}
											key={`field ${request.id}`}
										>
											<div className={style.fieldset_event_content}>
												<h4>
													{request.type === 'organization' && 'Crear una Organización'}
												</h4>
												<small className={style.small1}>
                          {request.status === 'pending' ? 'Pendiente' : request.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
												</small>
												<small className={style.small1}>
                          {request.createdAt ? request.createdAt.split('T')[0] : ''}
												</small>
                        <div className={style.dates}>
                          {request.description}
                        </div>
											</div>
										</fieldset>
									</React.Fragment>
							);
						})}
				</div>
			</section>
		</div>
	);
};

export default MyRequests;