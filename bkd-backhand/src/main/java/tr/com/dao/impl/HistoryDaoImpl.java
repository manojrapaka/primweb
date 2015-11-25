package tr.com.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import tr.com.dao.HistoryDao;
import tr.com.entities.History;
import tr.com.util.GenericHibernateDAO;

@Repository
@Transactional
public class HistoryDaoImpl extends GenericHibernateDAO<History, Long> implements HistoryDao {

    public History saveOrUpdate(History history) {

        if (history.getId() != null && history.getId() != 0l) {
            getSession().update(history);
        } else {
            getSession().save(history);
        }

        return history;
    }

    @SuppressWarnings("unchecked")
    public List<History> getAll() {

        Criteria criteria = getSession().createCriteria(History.class);
        List<History> history = (List<History>) criteria.list();

        return history;
    }

    @Override
    public void deleteById(History history) {
        getSession().delete(history);
    }

    @Override
    public History getById(Long historyId) {
        Criteria criteria = getSession().createCriteria(History.class);
        criteria.add(Restrictions.eq("historyId", historyId));

        History prim = (History) criteria.uniqueResult();

        return prim;
    }
}
