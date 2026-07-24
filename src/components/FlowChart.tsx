import { dailyHabit, opener, trees } from '@/data/flowchart';
import './flowchart.css';

export function FlowChart() {
  return (
    <div className="flow">
      <div className="flow-opener">
        {opener.map((phase) => (
          <div key={phase.title} className="flow-phase">
            <h3 className="flow-phase__title">{phase.title}</h3>
            {phase.rules.map((rule) => (
              <div key={rule.condition} className="flow-rule">
                <div className="flow-rule__cond">{rule.condition}</div>
                <div className="flow-rule__line">
                  <span className="flow-rule__k">Action:</span> {rule.action}
                </div>
                {rule.bonus && (
                  <div className="flow-rule__line">
                    <span className="flow-rule__k">Bonus:</span> {rule.bonus}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flow-trees">
        {trees.map((tree) => (
          <div key={tree.priority} className="flow-tree">
            <div className="flow-tree__head">
              <span className="flow-tree__pri">{tree.priority}</span>
              <span className="flow-tree__title">{tree.title}</span>
            </div>
            {tree.note && <p className="flow-tree__note">{tree.note}</p>}
            {tree.branches.map((branch) => (
              <div key={branch.condition} className="flow-branch">
                <div className="flow-branch__cond">{branch.condition}</div>
                <span className="flow-branch__arrow">↳</span>
                <span className="flow-branch__result">{branch.result}</span>
                {branch.hint && <span className="flow-branch__hint">{branch.hint}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flow-habit">{dailyHabit}</div>
    </div>
  );
}
