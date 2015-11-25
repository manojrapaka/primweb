package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.CalisanDao;
import tr.com.entities.Calisan;
import tr.com.entities.Kullanici;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class CalisanDaoImpl extends GenericHibernateDAO<Calisan, Long> implements CalisanDao {

    public Calisan saveOrUpdate(Calisan calisan) {

        if (calisan.getId() != null && calisan.getId() != 0l) {
            getSession().update(calisan);
        } else {
            getSession().save(calisan);
        }

        return calisan;
    }

    @SuppressWarnings("unchecked")
    public List<Calisan> getAll() {

        Criteria criteria = getSession().createCriteria(Kullanici.class);
        List<Calisan> calisan = (List<Calisan>) criteria.list();

        return calisan;
    }

    @Override
    public void deleteById(Calisan calisan) {
        getSession().delete(calisan);
    }

    @Override
    public Calisan getById(Long calisanId) {
        Criteria criteria = getSession().createCriteria(Calisan.class);
        criteria.add(Restrictions.eq("calisanId", calisanId));

        Calisan prim = (Calisan) criteria.uniqueResult();

        return prim;
    }
}
