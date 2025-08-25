import { useState, useEffect, use } from 'react'

function StoryGame({ story, onNewStory }) {
    const [currentNodeId, setCurrentNodeId] = useState(null)
    const [currentNode, setCurrentNode] = useState(null)
    const [options, setOptions] = useState([])
    const [isEnding, setIsEnding] = useState(false)
    const [isWinningEnding, setIsWinningEnding] = useState(false)

    useEffect(() => {
        if (story && story.root_node) {
            const rootNodeId = story.root_node.id
            setCurrentNodeId(rootNodeId)
        }
    }, [story])

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes) {
            const node = story.all_nodes[currentNodeId]

            setCurrentNode(node)
            setIsEnding(node.is_ending)
            setIsWinningEnding(node.is_winning_ending)

            if (!node.isEnding && node.options && node.options.length > 0) {
                setOptions(node.options)
            } else {
                setOptions([])
            }
        }
    }, [currentNodeId, story])

    const chooseOption = (optionId) => {
        setCurrentNodeId(optionId);
    }

    const restartStory = () => {
        if (story && story.root_node) {
            setCurrentNodeId(story.root_node.id)
            setIsEnding(false)
            setIsWinningEnding(false)
        }
    }

    return (
        <div className='story-game'>
            <header className='story-header'>
                <h2>{story.title}</h2>
            </header>

            <div className="story-content">
                {currentNode &&
                    <div className='story-node'>
                        <p>{currentNode.content}</p>

                        {isEnding ?
                            (
                                <div className='story-ending'>
                                    <h3>{isWinningEnding ? 'You Win!' : 'Game Over'}</h3>
                                    {isWinningEnding ? (
                                        <p>Congratulations! You have successfully completed the story.</p>
                                    ) : (
                                        <p>Unfortunately, your adventure has come to an end.</p>
                                    )}
                                </div>
                            ) :
                            (
                                <div className='story-options'>
                                    <h3>Choose your next action:</h3>
                                    <div className='options-list'>
                                        {options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => chooseOption(option.node_id)}
                                                className='option-btn'
                                            >
                                                {option.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                }

                <div className='story-controls'>
                    <button onClick={restartStory} className='reset-btn'>
                        Restart Story
                    </button>
                </div>

                {onNewStory && <button onClick={onNewStory} className='new-story-btn'>New Story</button>}

            </div>
        </div>
    )
}

export default StoryGame