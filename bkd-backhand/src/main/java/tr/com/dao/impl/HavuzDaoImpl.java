package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.HavuzDao;
import tr.com.entities.Havuz;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class HavuzDaoImpl extends GenericHibernateDAO<Havuz, Long> implements HavuzDao {

    public Havuz saveOrUpdate(Havuz havuz) {

        if (havuz.getId() != null && havuz.getId() != 0l) {
            getSession().update(havuz);
        } else {
            getSession().save(havuz);
        }

        return havuz;
    }

    @SuppressWarnings("unchecked")
    public List<Havuz> getAll() {

        Criteria criteria = getSession().createCriteria(Havuz.class);
        List<Havuz> havuz = (List<Havuz>) criteria.list();

        return havuz;
    }

    @Override
    public void deleteById(Havuz havuz) {
        getSession().delete(havuz);
    }

    @Override
    public Havuz getById(Long havuzId) {
        Criteria criteria = getSession().createCriteria(Havuz.class);
        criteria.add(Restrictions.eq("havuzId", havuzId));

        Havuz prim = (Havuz) criteria.uniqueResult();

        return prim;
    }
}
