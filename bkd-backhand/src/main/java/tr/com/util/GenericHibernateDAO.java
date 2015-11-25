package tr.com.util;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class GenericHibernateDAO<T, PK extends Serializable> implements GenericDAO<T, Serializable> {
	@SuppressWarnings("unused")
	private Class<T> persistentClass;

	@SuppressWarnings("unchecked")
	public GenericHibernateDAO() {
		this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
	}

	private SessionFactory sessionFactory;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public T save(T entity) {
		getSession().save(entity);
		return entity;
	}

	@Override
	public void delete(T entity) {
		getSession().delete(entity);
	}
	
	
}