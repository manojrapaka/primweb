package tr.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tr.com.dao.HistoryDao;

import tr.com.entities.History;

@Service
@EnableTransactionManagement
public class HistoryService {

    @Autowired
    private HistoryDao historyDao;

    public void saveOrUpdate(History history) {
        historyDao.saveOrUpdate(history);
    }

    public List<History> getAll() {
        return historyDao.getAll();
    }

    public void deleteById(History history) {
        historyDao.deleteById(history);
    }

    public History getById(Long historyId) {
        return historyDao.getById(historyId);
    }
}
